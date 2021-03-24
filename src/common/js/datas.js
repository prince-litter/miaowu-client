export default {
  //聊天列表
  friends:function () {
    let friendarr = [
      {
        id:1,
        imgUrl:'head-me.jpg',
        tip:2,
        name:'哈狗哈哈',
        time:new Date(),
        news:'君不见黄河之水天上来，倒海不复回君不见'
      },
      {
        id:2,
        imgUrl:'head-1.jpg',
        tip:12,
        name:'乖乖哈哈嘻嘻',
        time:new Date(),
        news:'君不见上来，倒海不复回君不见，哈行啊和'
      },
      {
        id: 3,
        imgUrl: 'head-2.jpg',
        tip: 3,
        name: '憨憨真可爱',
        time: new Date(),
        news: '君不见黄河之水天上来，倒海不复可可'
      },
      {
        id:4,
        imgUrl:'head-3.jpg',
        tip:0,
        name:'肉肉看不见',
        time:new Date(),
        news:'君不见黄河之水天上来，倒海不复回君不见，哈行啊和'
      },
      {
        id:5,
        imgUrl:'head-me.jpg',
        tip:222,
        name:'大海我的故乡',
        time:new Date(),
        news:'倒海不复回君不见，哈行啊和'
      },
      {
        id:6,
        imgUrl:'head-4.jpg',
        tip:2,
        name:'哈狗嘻嘻',
        time:new Date(),
        news:'君不见黄河之水天上来，倒海不复回君不见'
      },
      {
        id:7,
        imgUrl:'head-5.jpg',
        tip:12,
        name:'乖乖',
        time:new Date(),
        news:'君不见上来，倒海不复回君不见，哈行啊和'
      },
      {
        id: 8,
        imgUrl: 'head-1.jpg',
        tip: 3,
        name: '憨憨可',
        time: new Date(),
        news: '君不见黄河之水天上来，倒海不复可可'
      },
      {
        id:9,
        imgUrl:'head-2.jpg',
        tip:0,
        name:'肉肉',
        time:new Date(),
        news:'君不见黄河之水天上来，倒海不复回君不见，哈行啊和'
      },
      {
        id:10,
        imgUrl:'head-3.jpg',
        tip:222,
        name:'x大海东流去',
        time:new Date(),
        news:'倒海不复回君不见，哈行啊和'
      },
      {
        id: 11,
        imgUrl: 'head-1.jpg',
        tip: 3,
        name: '憨憨可哈怪',
        time: new Date(),
        news: '君不见黄河之水天上来，倒海不复可可'
      },
      {
        id:12,
        imgUrl:'head-2.jpg',
        tip:0,
        name:'肉肉',
        time:new Date(),
        news:'君不见黄河之水天上来，倒海不复回君不见，哈行啊和'
      }
    ];
    return friendarr;
  },
  //聊天消息
  message:function () {
    let msgs = [
      {
        id:'b', //用户id
        imgUrl:'head-2.jpg',
        message:{
          address:'东长安街天安门城楼内东长安街天安门城楼内',
          latitude:39.909473,
          longitude:116.39730899999999
        },
        types:3,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date(),  //发送时间
        tip:11
      },
      {
        id:'a', //用户id
        imgUrl:'head-1.jpg',
        message:{
          address:'四川省成都市都江堰市青城山镇成都东软件学院信息技术应用研究中心成都东软学院',
          latitude:30.889577,
          longitude:103.595209
        },
        types:3,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date(),  //发送时间
        tip:12
      },
      {
        id:'a', //用户id
        imgUrl:'head-1.jpg',
        message:{
          voice:'a',
          time:60
        },
        types:2,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date(),  //发送时间
        tip:9
      },
      {
        id:'b', //用户id
        imgUrl:'head-2.jpg',
        message:{
          voice:'a',
          time:20
        },
        types:2,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date(),  //发送时间
        tip:10
      },
      {
        id:'a', //用户id
        imgUrl:'head-1.jpg',
        message:'天生我才必有用，千金散尽还复来，哈行啊航航哈哈',
        types:0,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date() - 1000,  //发送时间
        tip:0
      },
      {
        id:'a', //用户id
        imgUrl:'head-1.jpg',
        message:'天生我才必有用，千金散尽还复来，哈行啊航航哈哈',
        types:0,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date() - 1000*16,  //发送时间
        tip:1
      },
      {
        id:'b', //用户id
        imgUrl:'head-2.jpg',
        message:'你真棒呀',
        types:0,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date() - 1000*60,  //发送时间
        tip:2
      },
      {
        id:'a', //用户id
        imgUrl:'head-1.jpg',
        message:'谢谢谢从',
        types:0,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date() - 1000*60*36,  //发送时间
        tip:3
      },
      {
        id:'a', //用户id
        imgUrl:'head-1.jpg',
        message:'head-1.jpg',
        types:1,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date() - 1000*60*40,  //发送时间
        tip:4
      },
      {
        id:'b', //用户id
        imgUrl:'head-2.jpg',
        message:'head-3.jpg',
        types:1,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date() - 1000*60*57,  //发送时间
        tip:5
      },
      {
        id:'b', //用户id
        imgUrl:'head-2.jpg',
        message:'卡看阿金开阿江发卡机发',
        types:0,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date() - 1000*60*60,  //发送时间
        tip:6
      },
      {
        id:'b', //用户id
        imgUrl:'head-2.jpg',
        message:'okokok',
        types:0,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date() - 1000*60*58*24,  //发送时间
        tip:7
      },
      {
        id:'a', //用户id
        imgUrl:'head-1.jpg',
        message:'约',
        types:0,                //内容类型（0文字，1图片连接，2音频连接）
        time: new Date() - 1000*60*58*24*20,  //发送时间
        tip:8
      },
    ]
    return msgs
  },

  //好友关系
  isfriend:function () {
    let isfriend = [
      {
        userid:1,
        friend:2,
      },
      {
        userid:1,
        friend:3,
      },
      {
        userid:1,
        friend:5,
      },
      {
        userid:1,
        friend:8,
      },
    ]
    return isfriend
  }
}

