import {styled} from "@mui/material/styles";
import { Button } from "@mui/material";

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

export const ImgSliderWrapper = styled('div')(() => ({
    '& figure': {
        margin: 0
    },
    '& button': {
        fill: '#ffffff !important'
    }
}))
export const ClassDetailWrapper = styled('div')(() => ({
    color: '#1976d2',
    marginTop: '10px',
    marginBottom: '10px',
    '& span': {
        display: 'block',
    },
    '& .title': {
        fontSize: '18px',
        marginBottom: '10px',
    },
    '& .description': {
        fontSize: '12px'
    }
}))
export const InfoWrapper = styled('section')(() => ({
    marginTop: '5px',
    marginBottom: '5px',
    boxSizing: 'border-box',
    padding: '20px 10px',
    border: '1px solid lightgray',
    borderRadius: '5px',
    '& span': {
        display: 'block'
    },
    '& .title': {
        color:'lightgray',
        fontSize: '14px',
        marginBottom: '8px'
    },
    '& .content': {
        fontSize: '14px',
        marginBottom: '10px'
    }
}))

export const ClassButton = styled(Button)(() => ({
    width: '100%',
    '& a': {
        textDecoration: 'none',
        color: 'white'
    }
}))