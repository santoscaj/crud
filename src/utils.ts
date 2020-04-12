export const required = (value: string) => ({
    show: !Boolean(value),
    message: "Value cannot be empty"
})

export function numericOnly(value: string){
    return {
        show: !/^([\d-\(\)\s])*$/.test(value),
        message: 'Field should only contain numbers'
    }
}

// extracts errors from array of tests
export function extract(criteria: any[]){
    for(const error of criteria){
        if(error.show){
            return error
        }
    }

    return { show: false }
}

export const validations = {
    get['firstName'](){
        return  ''
    }
}