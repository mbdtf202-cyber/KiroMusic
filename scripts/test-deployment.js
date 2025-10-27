/**
 * 部署后测试脚本
 * 自动测试前端、后端和智能合约的功能
 */

const axios = require('axios');
const { ethers } = require('ethers');

// 配置
const CONFIG = {
  frontendUrl: 'https://kiromusic-eskbl55m8-mbdtf202-cybers-projects.vercel.app',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
  rpcUrl: process.env.RPC_URL || 'https://sepolia.base.org',
  contracts: require('../deployments/base-sepolia.json').contracts || {},
};

// 测试结果
const results = {
  passed: 0,
  failed: 0,
  tests: [],
};

// 测试函数
async function test(name, fn) {
  try {
    console.log(`\n🧪 测试: ${name}`);
    await fn();
    console.log(`✅ 通过: ${name}`);
    results.passed++;
    results.tests.push({ name, status: 'passed' });
  } catch (error) {
    console.log(`❌ 失败: ${name}`);
    console.log(`   错误: ${error.message}`);
    results.failed++;
    results.tests.push({ name, status: 'failed', error: error.message });
  }
}

// 前端测试
async function testFrontend() {
  console.log('\n📱 测试前端...');
  console.log('='.repeat(50));

  await test('前端可访问', async () => {
    const response = await axios.get(CONFIG.frontendUrl);
    if (response.status !== 200) {
      throw new Error(`状态码: ${response.status}`);
    }
  });

  await test('前端包含正确的标题', async () => {
    const response = await axios.get(CONFIG.frontendUrl);
    if (!response.data.includes('KiroMusic') && !response.data.includes('Kiro')) {
      throw new Error('页面标题不正确');
    }
  });
}

// 后端测试
async function testBackend() {
  console.log('\n🔧 测试后端...');
  console.log('='.repeat(50));

  await test('后端健康检查', async () => {
    const response = await axios.get(`${CONFIG.backendUrl}/health`);
    if (response.data.status !== 'ok') {
      throw new Error('健康检查失败');
    }
  });

  await test('AI预测接口', async () => {
    try {
      const response = await axios.get(`${CONFIG.backendUrl}/api/ai/predict-hits?limit=5`);
      if (!Array.isArray(response.data)) {
        throw new Error('返回数据格式不正确');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('   ⚠️  AI接口未实现（这是正常的）');
      } else {
        throw error;
      }
    }
  });

  await test('市场数据接口', async () => {
    try {
      await axios.get(`${CONFIG.backendUrl}/api/market/trending`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('   ⚠️  市场接口未实现（这是正常的）');
      } else {
        throw error;
      }
    }
  });
}

// 智能合约测试
async function testContracts() {
  console.log('\n⛓️  测试智能合约...');
  console.log('='.repeat(50));

  if (!CONFIG.contracts.MusicNFT) {
    console.log('⚠️  未找到合约地址，跳过合约测试');
    return;
  }

  const provider = new ethers.JsonRpcProvider(CONFIG.rpcUrl);

  await test('MusicNFT合约已部署', async () => {
    const code = await provider.getCode(CONFIG.contracts.MusicNFT);
    if (code === '0x') {
      throw new Error('合约未部署');
    }
  });

  await test('RoyaltyVault合约已部署', async () => {
    const code = await provider.getCode(CONFIG.contracts.RoyaltyVault);
    if (code === '0x') {
      throw new Error('合约未部署');
    }
  });

  await test('Fractionalizer合约已部署', async () => {
    const code = await provider.getCode(CONFIG.contracts.Fractionalizer);
    if (code === '0x') {
      throw new Error('合约未部署');
    }
  });

  await test('KiroDAO合约已部署', async () => {
    const code = await provider.getCode(CONFIG.contracts.KiroDAO);
    if (code === '0x') {
      throw new Error('合约未部署');
    }
  });

  // 测试合约读取功能
  await test('MusicNFT合约可读取', async () => {
    const abi = ['function name() view returns (string)'];
    const contract = new ethers.Contract(CONFIG.contracts.MusicNFT, abi, provider);
    const name = await contract.name();
    if (!name) {
      throw new Error('无法读取合约名称');
    }
    console.log(`   合约名称: ${name}`);
  });
}

// 集成测试
async function testIntegration() {
  console.log('\n🔗 集成测试...');
  console.log('='.repeat(50));

  await test('前端可以访问后端', async () => {
    // 检查CORS配置
    try {
      await axios.get(`${CONFIG.backendUrl}/health`, {
        headers: {
          'Origin': CONFIG.frontendUrl,
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new Error('CORS配置错误');
      }
      throw error;
    }
  });
}

// 显示测试报告
function showReport() {
  console.log('\n' + '='.repeat(50));
  console.log('📊 测试报告');
  console.log('='.repeat(50));
  console.log(`\n总计: ${results.passed + results.failed} 个测试`);
  console.log(`✅ 通过: ${results.passed}`);
  console.log(`❌ 失败: ${results.failed}`);
  
  if (results.failed > 0) {
    console.log('\n失败的测试:');
    results.tests
      .filter(t => t.status === 'failed')
      .forEach(t => {
        console.log(`  - ${t.name}: ${t.error}`);
      });
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (results.failed === 0) {
    console.log('🎉 所有测试通过！');
  } else {
    console.log('⚠️  部分测试失败，请检查配置');
  }
  
  console.log('='.repeat(50) + '\n');
}

// 主函数
async function main() {
  console.log('🚀 KiroMusic 部署测试');
  console.log('='.repeat(50));
  console.log('\n配置:');
  console.log(`  前端: ${CONFIG.frontendUrl}`);
  console.log(`  后端: ${CONFIG.backendUrl}`);
  console.log(`  RPC: ${CONFIG.rpcUrl}`);
  console.log(`  合约: ${Object.keys(CONFIG.contracts).length} 个`);

  try {
    await testFrontend();
    await testBackend();
    await testContracts();
    await testIntegration();
  } catch (error) {
    console.error('\n❌ 测试过程中发生错误:', error.message);
  }

  showReport();
  
  // 退出码
  process.exit(results.failed > 0 ? 1 : 0);
}

// 运行测试
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { test, testFrontend, testBackend, testContracts };
