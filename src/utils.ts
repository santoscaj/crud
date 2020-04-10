export const required = (value: string)=> ({
    show: !Boolean(value),
    message: "Value cannot be empty"
})

export function extract(criteria: any[]){
    for(const error of criteria){
        if(error.show){
            return error
        }
    }

    return { show: false }
}