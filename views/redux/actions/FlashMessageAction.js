export const ADD_FLASH_MESSAGE = "add_flash_messages";

export function addFlashMessage(message){
    return {
        type: ADD_FLASH_MESSAGE,
        payload:{
            ...message
        }
    }
}