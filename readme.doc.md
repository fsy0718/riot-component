### API文档说明
由于riot的Tag语法局限，不能生成`riot.mount('riot-calendar',opts)`这种规则的文档，只能通过`riot-calendar(opts)`来生成文档
但所有文档都能保证其使用正确性，调用组件时，还是按照riot的标准使用，如

```javascript
    riot.mount('riot-calendar', {
        isRange: true
    })
```
### 组件
- [日历](./module-riot-calendar.html)
- [滑块](./module-riot-slider.html)