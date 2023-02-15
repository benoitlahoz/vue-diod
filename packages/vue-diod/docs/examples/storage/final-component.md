---
title: Final Component
---

# {{ $frontmatter.title }}

<script setup>
import StorageProvider from '../../.vitepress/theme/examples-components/storage/storage-provider.component.vue';
</script>

<div style="width: 100%; display: flex; justify-content: center; margin: 4rem 0;">
  <StorageProvider />
</div>

::: tip
Open your devtools and see how data is stored with the prefix in localStorage.
:::
