# KiroMusic 组件索引

## 核心业务组件

### AudioPlayer
音频播放器组件，支持播放控制、进度条、音量调节
```tsx
<AudioPlayer audioUrl="..." title="..." artist="..." />
```

### NFTCard
NFT卡片展示组件
```tsx
<NFTCard tokenId={1} name="..." artist="..." coverImage="..." />
```

### TokenCard
代币卡片展示组件
```tsx
<TokenCard address="..." name="..." symbol="..." totalSupply={...} />
```

### MintNFTForm
NFT铸造表单
```tsx
<MintNFTForm />
```

### FractionalizeForm
NFT碎片化表单
```tsx
<FractionalizeForm tokenId={1} onSuccess={() => {}} />
```

### RoyaltyDashboard
版税仪表板
```tsx
<RoyaltyDashboard rMusicToken="..." tokenSymbol="..." />
```

### ProposalCard
DAO提案卡片
```tsx
<ProposalCard id={1} title="..." description="..." />
```

## 通用UI组件

### Modal
模态对话框
```tsx
<Modal isOpen={true} onClose={() => {}} title="...">
  {children}
</Modal>
```

### Toast
消息通知
```tsx
<Toast id="1" message="..." type="success" onClose={() => {}} />
```

### Tabs
标签页
```tsx
<Tabs tabs={[{id: '1', label: '...', content: <div />}]} />
```

### Pagination
分页组件
```tsx
<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
```

### SearchBar
搜索栏
```tsx
<SearchBar onSearch={(query) => {}} placeholder="..." />
```

### LoadingSpinner
加载动画
```tsx
<LoadingSpinner size="md" text="Loading..." />
```

### Skeleton
骨架屏
```tsx
<Skeleton variant="rectangular" width={200} height={100} />
```

### EmptyState
空状态提示
```tsx
<EmptyState icon={Music} title="..." description="..." />
```

### ErrorMessage
错误提示
```tsx
<ErrorMessage message="..." onClose={() => {}} />
```

### SuccessMessage
成功提示
```tsx
<SuccessMessage message="..." onClose={() => {}} />
```

### Badge
徽章标签
```tsx
<Badge variant="success" size="md">Label</Badge>
```

### ProgressBar
进度条
```tsx
<ProgressBar value={50} max={100} label="..." />
```

### StatCard
统计卡片
```tsx
<StatCard label="..." value="..." icon={TrendingUp} />
```

### CopyButton
复制按钮
```tsx
<CopyButton text="..." label="Copy" />
```

### ConfirmDialog
确认对话框
```tsx
<ConfirmDialog
  isOpen={true}
  onClose={() => {}}
  onConfirm={() => {}}
  title="..."
  message="..."
/>
```

### Dropdown
下拉选择器
```tsx
<Dropdown
  options={[{value: '1', label: '...'}]}
  value="1"
  onChange={() => {}}
/>
```
