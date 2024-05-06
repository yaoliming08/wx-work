// components/activeList/index.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    activeItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
        console.log(activeItem);
    }
  }
})