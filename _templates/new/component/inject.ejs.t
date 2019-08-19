---
inject: true
to: app/components/<%= category %>/index.ts
append: true
---
export * from './<%= name %>';