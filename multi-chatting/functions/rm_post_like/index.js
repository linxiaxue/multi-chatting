// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'licstest1-79fr9',
  traceUser: true
})

const db = cloud.database()
const _ = db.command
var ret_item;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('begin rm_post_like')
  try {
    console.log('old-rm-like-cnt', event.item_cloud.like_count);
    await db.collection('posts').where({
      _id: event.item_cloud._id
    })
      .update({
        data: {
          like_count: _.inc(-1)
        },
      });
    console.log('new-rm-like-cnt', event.item_cloud.like_count);
  } catch (e) {
    console.error(e)
  };

}