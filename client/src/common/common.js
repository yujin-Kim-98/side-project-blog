import dotenv from 'dotenv'

dotenv.config()


/*
    넘어온 값이 빈 값인지 확인
*/
export const isEmpty = (e) => {
    var value = e.target.value

    if (value == '' || value == null || value == undefined || (value != null && typeof value == 'object' && !Object.keys(value).length)) {
        return true
    } else {
        return false
    }
}

/*
    API Config : TOKEN X
*/
export const apiNotTokenConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
}

/*
    API Config : TOKEN O
*/

