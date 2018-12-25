import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
const redirectStatuses = [301, 302, 303, 307, 308, 500, 0, 401, 400];

class App extends Component {
  state = {
    fetchMsg: ""
  };
  checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    // console.log('response', redirectStatuses, response.status,
    // redirectStatuses.indexOf(response.status) !== -1)
    if (redirectStatuses.indexOf(response.status) !== -1) {
      return response;
    }
    let error;
    error = new Error(response.status + " " + response.statusText);
    error.response = response;
    throw error;
  };
  async testFetch() {
    // const test2 = await new Promise((res, rej) => {
    //   return rej("这个错误是啥子？", rej);
    // });
    // 如果这里的promise被reject了，是会报错的，下面的console语句根本就不会执行。

    // const test2 = await Promise.resolve(() => {
    //   return new Error("这是直接跑错的一个错误对象实例");
    // });
    // 使用return的方式抛错，返回的test2是一个函数

    // const test2 = await Promise.resolve(() => {
    //   throw new Error("这是直接跑错的一个错误对象实例");
    // });
    // 使用throw的方式抛错，返回的test2是一个函数

    // console.log("这里测试的是promise的reject", test2, typeof test2);
    // 推导:
    // 前提1： 当使用fetch请求数据的时候，就算遇到某些400或者500状态码的响应，fetch返回的promise是
    // resolve状态的；不会被reject。
    //

    try {
      // let response = await fetch("xx.png")
      // const response = await fetch(
      //   "https://dev.cloudsubscription.com/storefront/public/api/cloud/storefront/subscriptions/contractNo/361469/lineNo/1/actions?serviceNo=50026&serviceStatus=Cancel&lastModifyDatetime=1542016475073"
      // )
      //   .then(response => {
      //     this.setState({
      //       fetchMsg: "resolve"
      //     });
      //     console.log("response", response, "ok");
      //     return response;
      //   })
      //   .catch(err => {
      //     this.setState({
      //       fetchMsg: "reject"
      //     });
      //     console.log("请求报错err", err, "error");
      //     return err;
      //   });
      // console.log("这个promise对象可以返回吗？", response);
      // 1. 当上面的url请求报错的时候，如果没有在fetch后面写then方法，出错之后后面的代码都会被阻塞，
      // 最下面的那个try...catch是无法捕获到错误的。
      // 2. 如果写了catch方法来捕获请求抛错，出粗后下面的代码是可以执行的。但是response是一个错误信息（ TypeError: Failed to fetch）
      // 而不是undefined
      // 注意： 这里的await返回的是最后一个promise的返回值

      let response = null;
      try {
        response = await fetch(
          "https://dev.cloudsubscription.com/storefront/public/api/cloud/storefront/subscriptions/contractNo/361469/lineNo/1/actions?serviceNo=50026&serviceStatus=Cancel&lastModifyDatetime=1542016475073"
        );
      } catch (e) {
        console.log("这个promise对象可以返回吗？", response);
        this.checkStatus(response);
      }
    } catch (e) {
      new Error("这里的catch是否能捕获请求报错？", e);
    }
  }
  componentDidMount = () => {
    this.testFetch();
  };
  render() {
    return (
      <div className="App">
        <h1>fetch错误捕获机制 </h1>
        <h2>{this.state.fetchMsg}</h2>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
