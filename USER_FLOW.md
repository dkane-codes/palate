# Palate Mobile User Flow

## Primary Restaurant Use Case

```
📱 User at Restaurant Table
         ↓
    Opens Palate App
         ↓
┌────────────────────────┐
│   Quick Actions        │
│  ┌──────────────────┐  │
│  │  📷 Photo Menu   │  │  ← Primary action
│  │  📄 Upload Menu  │  │
│  │  🔗 Menu Link    │  │
│  └──────────────────┘  │
└────────────────────────┘
         ↓
┌────────────────────────┐
│   Camera/Upload        │
│                        │
│  📸 [Capture Menu]     │  ← One-tap photo
│      or                │
│  📁 [Choose File]      │
└────────────────────────┘
         ↓
┌────────────────────────┐
│   Processing           │
│                        │
│  🤖 AI Analyzing...    │
│  ⏱️  ~10-15 seconds    │
│                        │
└────────────────────────┘
         ↓
┌────────────────────────┐
│   Results Screen       │
│                        │
│  🎯 TOP PICKS (3-5)    │  ← Mobile-optimized
│  ⚠️  AVOID (allergies)  │    card layout
│  💡 ALTERNATIVES       │
│  📊 Full Analysis      │
└────────────────────────┘
         ↓
┌────────────────────────┐
│   Order Confidence     │
│                        │
│  ✅ "I'll have the     │
│      Grilled Salmon"   │
│                        │
│  💾 Save Analysis      │
│  ⭐ Rate Experience    │
└────────────────────────┘
```

## Secondary Flows

### 🏠 At Home Planning
```
Home → Browse Saved → Plan Visit → Share with Friends
```

### ⚙️ Profile Setup (One-time)
```
Sign Up → Dietary Restrictions → Allergies → Preferences → Done
```

### 📚 History & Learning
```
Dashboard → Past Analyses → Learning Patterns → Better Recommendations
```

## Mobile-First Principles

1. **One-handed operation** - Primary actions accessible with thumb
2. **Large touch targets** - Minimum 44px tap areas
3. **Minimal text input** - Voice notes, photo upload, quick toggles
4. **Offline-friendly** - Cache results for poor restaurant WiFi
5. **Quick access** - Home screen widget for instant camera
6. **Battery conscious** - Efficient image processing

## Key Moments

1. **🚪 Entering Restaurant** - Quick launch from home screen
2. **📖 Menu Arrival** - Instant photo capture
3. **🤔 Decision Time** - Clear, scannable recommendations
4. **🗣️ Ordering** - Confidence in choice
5. **📱 Leaving** - Save for future reference