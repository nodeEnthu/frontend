import { postCall, putImgCall } from 'utils/httpUtils/apiCallWrapper'

function s3ImageUpload(fileConfig, s3Data) {
    postCall('/api/upload/sign', { 'file-name': fileConfig.name, 'file-type': fileConfig.type })
        .then(function(response) {
            putImgCall(response.data.signedRequest, s3Data, { 'file-name': fileConfig.name, 'file-type': fileConfig.type })
                .then(function(res) {
                    // dont do anything for now ... assume its gonna pass every time
                })
        });
}
export default s3ImageUpload;
