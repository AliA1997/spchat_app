export const filterSocialMedia = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === 'twitter' || arr[i] === 'facebook' || arr[i] === 'snapchat'
        || arr[i] === 'twitchtv' || arr[i] === 'playstation' || arr[i] === 'xbox' ||
        arr[i] === 'reddit' || arr[i] === 'instagram') {
            arr.splice(i, 1);
        }
    }
    return arr;
}