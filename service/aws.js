
const aws = require("aws-sdk");

const upload_to_s3 =(filename,body)=>{

    const s3bucket = new aws.S3({
        accessKeyId:process.env.ACCESSKEY,
        secretAccessKey:process.env.SECRETKEY
    });

    const params = {
       Bucket:process.env.BUCKETNAME,
       Key:filename,
       Body:body,
       ACL:"public-read"
    }
   return new Promise((resolve,reject)=>{

       s3bucket.upload(params,(err,s3response)=>{
           if(err)
           {
               reject(err)
           }
           resolve(s3response.Location)
       })
   })
}

module.exports = upload_to_s3;