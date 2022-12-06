import React, { useState } from "react";

import { Button } from "@mui/material";
import { TextField, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Image from "next/image";
import Link from "next/link";

import Card from '../../components/Card/index';
import ListCard from '../../components/ListCard/index';

import { getClassesList } from "../../src/services/classes.api";
import { Classes } from "../../src/utils/database/database.entities";
import styles from "../../styles/Home.module.css";
import {margin} from "@mui/system";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{
          marginTop: 10
        }}
      >
        {value === index && (
            <span>{children}</span>
        )}
      </div>
  );
}

function ClassList({ gymList }) {
  const [gyms, setGyms] = useState(gymList);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const contents = {
    themeIcon: null,
    background: null,
    title: '가나다',
    address: '대야동',
    credit: 3
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  const showGymList = () => {
    return gyms.map((gym: Classes) => {
      return (
        <Button key={gym.id} variant="contained">
          <Link href={`/classes/${encodeURIComponent(gym.id)}`}>
            {gym.name}
          </Link>
        </Button>
      );
    });
  };

  return (
    <div>
      {/*<TextField*/}
      {/*  fullWidth*/}
      {/*  sx={{*/}
      {/*    borderRadius: 20,*/}
      {/*    marginBottom: '20px'*/}
      {/*  }}*/}

      {/*  InputProps={{*/}
      {/*  endAdornment: (*/}
      {/*      <IconButton>*/}
      {/*        <SearchOutlinedIcon />*/}
      {/*      </IconButton>*/}
      {/*  ),*/}
      {/*}}/>*/}
      {/*<Tabs*/}
      {/*  value={value}*/}
      {/*  onChange={handleChange}*/}
      {/*  aria-label="basic tabs example"*/}
      {/*  variant="fullWidth"*/}
      {/*  sx={{*/}
      {/*      "& .MuiTabs-indicator": {*/}
      {/*          display: "flex",*/}
      {/*          justifyContent: "center",*/}
      {/*          backgroundColor: "#7A98EE",*/}
      {/*          height: "3px"*/}
      {/*      },*/}
      {/*      "& .MuiTabs-indicatorSpan": {*/}
      {/*          backgroundColor: "#7A98EE"*/}
      {/*      }*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Tab*/}
      {/*      label="First"*/}
      {/*      {...a11yProps(0)}*/}
      {/*      sx={{*/}
      {/*          '&.Mui-selected': {*/}
      {/*              color: '#7A98EE',*/}
      {/*              fontWeight: 'bold'*/}
      {/*          },*/}
      {/*          '&.Mui-focusVisible': {*/}
      {/*              backgroundColor: 'rgba(100, 95, 228, 0.32)',*/}
      {/*          },*/}
      {/*      }}*/}
      {/*  />*/}
      {/*  <Tab*/}
      {/*      label="Second"*/}
      {/*      {...a11yProps(1)}*/}
      {/*      sx={{*/}
      {/*          '&.Mui-selected': {*/}
      {/*              color: '#7A98EE',*/}
      {/*              fontWeight: 'bold'*/}
      {/*          },*/}
      {/*          '&.Mui-focusVisible': {*/}
      {/*              backgroundColor: 'rgba(100, 95, 228, 0.32)',*/}
      {/*          },*/}
      {/*      }}*/}
      {/*  />*/}
      {/*  <Tab*/}
      {/*      label="Third"*/}
      {/*      {...a11yProps(2)}*/}
      {/*      sx={{*/}
      {/*          '&.Mui-selected': {*/}
      {/*              color: '#7A98EE',*/}
      {/*              fontWeight: 'bold',*/}
      {/*              borderBottom: '1px solid #7A98EE'*/}
      {/*          },*/}
      {/*          '&.Mui-focusVisible': {*/}
      {/*              backgroundColor: 'rgba(100, 95, 228, 0.32)',*/}
      {/*          },*/}
      {/*      }}*/}
      {/*  />*/}
      {/*</Tabs>*/}
      {/*<TabPanel value={value} index={0}>*/}
      {/*  /!*<span className={styles.classListTitle}>Our First Class</span>*!/*/}
      {/*  <ListCard gyms={gyms}/>*/}
      {/*</TabPanel>*/}
      {/*<TabPanel value={value} index={1}>*/}
      {/*  /!*<span className={styles.classListTitle}>Our Second Class</span>*!/*/}
      {/*  <ListCard gyms={gyms}/>*/}
      {/*</TabPanel>*/}
      {/*<TabPanel value={value} index={2}>*/}
      {/*  /!*<span className={styles.classListTitle}>Our Third Class</span>*!/*/}
      {/*  <ListCard gyms={gyms}/>*/}
      {/*</TabPanel>*/}
        <ListCard gyms={gyms}/>
    </div>
  );
}

export async function getServerSideProps() {
  const gymList = await getClassesList();
  return {
    props: { gymList },
  };
}

export default ClassList;
