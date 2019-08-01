/**
 * @author 정규현
 * @summary 리덕스 
 */

export const initalState = {
    fBoard:[],
    pBoard:[],
    qBoard:[],
    banner: [], 
};

export const MAIN_DATA_REQUEST = "MAIN_DATA_REQUEST";
export const MAIN_DATA_SUCCESS = "MAIN_DATA_SUCCESS";
export const MAIN_DATA_FAILURE = "MAIN_DATA_FAILURE";

const reducer = (state=initalState, action) =>{
    switch(action.type){
        case MAIN_DATA_REQUEST :{
            return{
                ...state,
            };
        }
        case MAIN_DATA_SUCCESS :{
            return{
                ...state,
                fBoard:[...action.data.fBoard],
                pBoard:[...action.data.pBoard],  
                qBoard:[...action.data.qBoard],
                banner: [...action.data.banner], 
            };
        }
        case MAIN_DATA_FAILURE :{
            return{
                ...state,
            };
        }
        default :{
            return{
                ...state,
            }
        }
    };
};

export default reducer;