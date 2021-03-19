export default {
  //首页时间转换
  dataTime(d){
    let old = new Date(d);
    let now = new Date();
    //获取old具体时间
    let od = old.getTime();
    let h = old.getHours();
    let m = old.getMinutes();
    let Y = old.getFullYear();
    let M = old.getMonth() + 1;
    let D = old.getDate();
    //获取now的具体时间
    let nd = now.getTime();
    let nh = now.getHours();
    let nm = now.getMinutes();
    let nY = now.getFullYear();
    let nM = now.getMonth() + 1;
    let nD = now.getDate();

    //当天之内，统一显示hh:mm 如09:32
    //大于今天昨天之内，统一显示 昨天hh:mm 如 昨天09:32
    //大于昨天之内，统一显示 YY/MM/DD 如：2020/03/22


    //当天时间
    if(D === nD && M === nM && Y === nY){
      if(h<10){
        h = '0' + h;
      }
      if(m<10){
        m = '0' + m
      }
      return h + ":" + m
    }

    //前天时间
    if(D + 1 === nD && M === nM && Y === nY){
      if(h<10){
        h = '0' + h;
      }
      if(m<10){
        m = '0' + m
      }
      return '昨天' + h + ":" + m
    }else {
      //大于两天
      return Y + '/' + M +'/' + D
    }
  },
  //聊天时间
  dataTime1(d){
    let old = new Date(d);
    let now = new Date();
    //获取old具体时间
    let od = old.getTime();
    let h = old.getHours();
    let m = old.getMinutes();
    let Y = old.getFullYear();
    let M = old.getMonth() + 1;
    let D = old.getDate();
    //获取now的具体时间
    let nd = now.getTime();
    let nh = now.getHours();
    let nm = now.getMinutes();
    let nY = now.getFullYear();
    let nM = now.getMonth() + 1;
    let nD = now.getDate();


    //当天时间
    if(D === nD && M === nM && Y === nY){
      if(h<10){
        h = '0' + h;
      }
      if(m<10){
        m = '0' + m
      }
      return h + ":" + m
    }

    //前天时间
    if(D + 1 === nD && M === nM && Y === nY){
      if(h<10){
        h = '0' + h;
      }
      if(m<10){
        m = '0' + m
      }
      return '昨天' + h + ":" + m
    }else if(Y === nY) {
      if(h<10){
        h = '0' + h;
      }
      if(m<10){
        m = '0' + m
      }
      //今年
      return  M + '月' + D + '日' +  h + ":" + m
    }else {
      //大于今年
      if(h<10){
        h = '0' + h;
      }
      if(m<10){
        m = '0' + m
      }
      return  Y + '年' + M + '月' + D + '日' +  h + ":" + m
    }
  },
  //详细时间
  detailTime1(e){
    let old = new Date(e);
    //获取old具体时间
    let Y = old.getFullYear();
    let M = old.getMonth()+1;
    let D = old.getDate();

    //处理时间
    if(M<10){
      M = '0' + M;
    }
    if(D<10){
      D = '0' + D;
    }
    return Y + '-' + M + '-' + 'D'
  },

  //间隔时间差
  spaceTime(old,now){
    old = new Date(old);
    now = new Date(now);
    let told = old.getTime();
    let tnow = now.getTime();
    if(told>(tnow+1000*60*5)){
      return now;
    }else {
      return '';
    }
  }


}
