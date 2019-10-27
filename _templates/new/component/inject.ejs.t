---
inject: true
to: client/components/<%= category %>/index.ts
append: true
---
export * from './<%= name %>';