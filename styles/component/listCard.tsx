import { styled } from '@mui/material/styles';

export const ListTitle = styled('span')(() => ({
    fontWeight: 'bold',
    color: 'black'
}));

export const ListWrapper = styled('section')(() => ({
    marginBottom: '70px',
    // height: '400px',
    // overflowY: 'scroll'
}));

export const ListCardWrapper = styled('div')(() => ({
    marginTop: '20px',
    width: '100%',
    height: '90px',
    border: '1px solid lightgray',
    borderRadius: '8px',
    boxSizing: 'border-box',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '& span + span': {
        display: 'block'
    },
    '& section': {
        width: '100%',
    },
    '& figure': {
        margin: 0,
        marginRight: '10px',
        display: 'flex',
        justifyContent: 'center'
    }
}));
export const PlaceImg = styled('img')(() => ({
    width: '60px',
    height: '60px',
    borderRadius: '5px'
}));
export const Name = styled('span')(() => ({
    display: 'block',
    fontSize:'14px'
}));
export const Explain = styled('span')(() => ({
    fontSize:'12px'
}));
