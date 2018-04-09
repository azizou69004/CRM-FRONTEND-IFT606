export const CHANGE_VIEW_COLL = 'CHANGE_VIEW_COLL';


export function changeViewCollective (newView){
    return {type: CHANGE_VIEW_COLL, newView}
}
