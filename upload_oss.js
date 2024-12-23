import  OSS from'ali-oss';
import path from 'path'
// import jjj from 'package.json'
import fs from 'fs'


// 初始化OSS客户端。请将以下参数替换为您自己的配置信息。
const client = new OSS({
  region: 'region', // 示例：'oss-cn-hangzhou'，填写Bucket所在地域。
  accessKeyId: 'accessKeyId', // 确保已设置环境变量OSS_ACCESS_KEY_ID。
  accessKeySecret: 'accessKeySecret', // 确保已设置环境变量OSS_ACCESS_KEY_SECRET。
  bucket: 'bucket', // 示例：'my-bucket-name'，填写存储空间名称。
});
 
  
//   get();

// 自定义请求头
const headers = {
    // 指定Object的存储类型。
    'x-oss-storage-class': 'Standard',
    // 指定Object的访问权限。
    'x-oss-object-acl': 'default',
    // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
    'Content-Disposition': 'attachment; filename="example.txt"',
    // 设置Object的标签，可同时设置多个标签。
    'x-oss-tagging': 'Tag1=1&Tag2=2',
    // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
    'x-oss-forbid-overwrite': 'false',
  };
  
  async function put () {
    try {
      repalceVersion()
      // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
      // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      const result = await client.put('/yun_han_shu/xxx/latest.js', path.normalize('./dist/vite-vue-ts-starter.user.js')
      // 自定义headers
      ,{headers}
      );
      if(result.res.status === 200){
        console.log('latest版本上传成功!');
      }

      const version = getVersion()
      const result1 = await client.put('/yun_han_shu/xxx/'+version+'.js', path.normalize('./dist/vite-vue-ts-starter.user.js')
      // 自定义headers
      ,{headers}
      );
      if(result.res.status === 200){
        console.log( version + '版本上传成功!');
      }

    //   console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 把打包后的依赖的版本号去掉
   */
  function repalceVersion(){
    var text = fs.readFileSync('./package.json', 'utf8')
    var res = JSON.parse(text)
    // 获取vue版本号
    let jqVesion = res.dependencies.jquery.replace('^','@')
    let elpVesion = res.dependencies['element-plus'].replace('^','@')
    // console.log(jqVesion);
    // console.log(elpVesion);
    // 替换dist
    var dist = fs.readFileSync('./dist/vite-vue-ts-starter.user.js', 'utf8')
    // let startIndex = dist.indexOf('})(Vue,')
    dist = replaceFromEnd(dist,jqVesion,'')
    dist = replaceFromEnd(dist,elpVesion,'')
    // dist = '666'
    fs.writeFileSync('./dist/vite-vue-ts-starter.user.js',dist,'utf-8')
    // console.log(startIndex);
  }  

  function replaceFromEnd(str, search, replace) {
    // 反转字符串和待替换内容
    const reversedStr = str.split('').reverse().join('');
    const reversedSearch = search.split('').reverse().join('');
    // 替换
    const replacedStr = reversedStr.replace(reversedSearch, replace);
    // 再次反转回来
    return replacedStr.split('').reverse().join('');
  }
//   listBuckets();
  function getVersion(){
    var text = fs.readFileSync('./package.json', 'utf8')
    var res = JSON.parse(text)
    // import {version} from './package.json';
    return res.version;
} 
// repalceVersion()
put();