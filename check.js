export function lengthCheck(param1,param2,param3){
    let isTrue = null;
    if(param1){
        if (param1.length > 32 || param1.length < 3) {
            isTrue = 'WRONG EMAIL';
        }
    }
    if (param2){
        if (param2.length > 32 || param2.length < 3) {
            isTrue = 'WRONG YOUR NAME';
        }
    }
    if (param3){
        if (param3.length > 64 || param3.length < 3) {
            isTrue = 'WRONG PASSWORD';
        }
    }
    return isTrue;
}
export function encrypted(param){
    return param;
}