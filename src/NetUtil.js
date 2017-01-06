/**
 * Created by hongty on 2016/11/15.
 */
let NetUtil = {
  // postJson(url, callback){
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(json => alert(json))
  //     .catch(error => {
  //       alert(
  //         'Error ' + 'There seems to be an issue connecting to the network.'
  //       );
  //     });
  // },
  postJson(url, callback){
    fetch(url, callback)
      .then((response) => response.text())
      .then((responseText) => {
        callback(responseText);
      })
      .catch((err)=> {
        console.error(err);
        alert("网络错误，请稍后重试");
      }).done();
  },
}
export default NetUtil;