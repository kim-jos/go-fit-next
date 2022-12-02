import {styled} from "@mui/material/styles";

export const CardWrapper = styled('div')(() => ({
    boxSizing: 'border-box',
    padding: '15px',
    width: '200px',
    height: '200px',
    borderRadius: '15px',
    border: '1px solid lightgray',
    cursor: 'pointer',
    background: '#481D52',
    color: 'white',
    '& span + span': {
        display: 'block',
        marginTop: '20px'
    }
}));

export const SwipeWrapper = styled('div')(() => ({
    marginTop: '10px',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginBottom: '20px',
}))

export const CardName = styled('span')(() => ({
    fontSize: '16px'
}))

export const CardAddress = styled('span')(() => ({
    fontSize: '14px'
}))
