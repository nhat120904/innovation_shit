import { botttsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Box, Fade, Stack, Tab, Tabs,Typography, Divider} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Archive from './accountPage/Archive';
import Information from './accountPage/Information';
import Balance from './accountPage/Balance';
import Transactions from './accountPage/Transactions';
import { useSelector } from 'react-redux';

async function getImage(id) {
  const img = await createAvatar(botttsNeutral, {
    seed: id,
    size: 128,
    // backgroundtype: "gradientLinear"
    // ... other options
  }).toDataUri()

  return img;
}

function Head() {
    const [imgAPI,setImgAPI] = useState(null)
    const authState = useSelector(state => state.auth.user)

    useEffect(()=>{
      if(authState && authState.userId) getImage(authState.userId).then((api)=>setImgAPI(api))

    },[])
    return (
      <Stack direction={{xs: "column", md: "row"}} sx={{height: {xs: "fit-content", md: "300px"}}} spacing={"20px"}>
            <Box 
                sx={{
                    borderRadius: "20px", overflow: "hidden", position: "relative",
                    height: {md: "300px"}, width: {xs: "100%", md: "300px"},
                    "&::before": {content: "''", paddingTop: "100%", display: "block"}
                }}
            >
                <img src={imgAPI} style={{position: "absolute", top: 0, left: 0, height: "100%", width: "100%"}}/>
            </Box>
            <Stack direction={"column"} spacing={"5px"} sx={{flexGrow: 1}}>
              <Typography variant='h4' sx={{color: "secondary.main", fontWeight: "600"}}>User Name </Typography>
              <Typography variant='body1' sx={{color: "secondary.dark"}}>0xHF89DF97F0DW78KJ</Typography>
              <Typography variant='body1' sx={{color: "secondary.dark"}}>exampleuseremail@test.com</Typography>
              <Stack direction={{sx:"column", md: "row"}} spacing={"20px"} sx={{width: "100%", height: "100%", justifyContent: "space-around", alignItems: "center"}}>
                  <Stack direction={"column"} spacing={"10px"} sx={{justifyContent: "center", alignItems: "center"}}>
                    <Typography variant='h6' sx={{color: "secondary.dark", fontWeight: "600"}}>Balance</Typography>
                    <Typography variant='h5' sx={{color: "secondary.main", fontWeight: "700"}}>1000 LUX</Typography>
                  </Stack>
                  <Divider orientation='vertical' sx={{height: "60%"}}/>
                  <Stack direction={"column"} spacing={"10px"} sx={{justifyContent: "center", alignItems: "center"}}>
                    <Typography variant='h6' sx={{color: "secondary.dark", fontWeight: "600"}}>Transactions</Typography>
                    <Typography variant='h5' sx={{color: "secondary.main", fontWeight: "700"}}>999</Typography>
                  </Stack>
                  <Divider orientation='vertical' sx={{height: "60%"}}/>
                  <Stack direction={"column"} spacing={"10px"} sx={{justifyContent: "center", alignItems: "center"}}>
                    <Typography variant='h6' sx={{color: "secondary.dark", fontWeight: "600"}}>Archived</Typography>
                    <Typography variant='h5' sx={{color: "secondary.main", fontWeight: "700"}}>10</Typography>
                  </Stack>
              </Stack>
            </Stack>
      </Stack>
    )
  }
  
function Body() {
    const [current, setCurrent] = useState(0)

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto" 
                    value={current} onChange={(e,v) => setCurrent(v)} 
                    aria-label="basic tabs example"
                >
                    <Tab label="Archive"/>
                    <Tab label="Information"/>
                    <Tab label="Balance"/>
                    <Tab label="Transactions" />
                </Tabs>
            </Box>
            <Box sx={{ mt: "20px" }}>
                <Fade sx={{display: current === 0 ? "block" : "none"}} in={current === 0}>
                    <Box sx={{width: "100%"}}><Archive/></Box>
                </Fade>
                <Fade sx={{display: current === 1 ? "block" : "none"}} in={current === 1}>
                    <Box sx={{width: "100%"}}><Information/></Box>
                </Fade>
                <Fade sx={{display: current === 2 ? "block" : "none"}} in={current === 2}>
                    <Box sx={{width: "100%"}}><Balance/></Box>
                </Fade>
                <Fade sx={{display: current === 3 ? "block" : "none"}} in={current === 3}>
                    <Box sx={{width: "100%"}}><Transactions/></Box>
                </Fade>
            </Box>
        </Box>
    )
  }

function AccountPage() {
  return (
    <Stack direction={"column"} spacing={"20px"}>
        <Head/> 
        <Body/>
    </Stack>
  )
}

export default AccountPage