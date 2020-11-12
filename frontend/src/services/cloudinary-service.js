async function uploadImg(ev) {
    const CLOUD_NAME = "itayavrahami1"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'myToys');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log(data);
        return data

    } catch (err) {
        console.log(err);
    }
    // .then(res => res.json())
    // .then(res => {
    //     console.log(res)
    //     // res.secure_url
    //     return res
    // })
    // .catch (err => console.error(error))
}

export const cloudinaryService = {
    uploadImg
}
