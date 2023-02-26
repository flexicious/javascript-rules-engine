import { AppBar, Button, CircularProgress, MenuItem, Select, Stack, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { MultiProductCarousel } from './MultiCarousel';
import { ProductCarousel } from './ProductCarousel';
import { ProductApiResponse } from '../shared/types';
import { getProducts, User } from '../mockServer/products';
export const Store = () => {

  const users:User[] = [
    {

      username: 'Admin',
      birthdate: '1989-01-01',
      gender: "Female",
      email: "admin@abc.com"
    },
    {
      username: 'Male, age 30-40',
      birthdate: '1989-01-01',
      gender: "Male",
      email: "test@test.com",
    }, 
    {

      username: 'Female, age 30-40',
      birthdate: '1989-01-01',
      gender: "Female",
      email: "test1@test.com"
    },
    {
      username : "Male, age  < 20",
      birthdate: '2010-01-01',
      gender: "Male",
      email: "test2@test.com",
    }, 
    {

      username: 'Female, age < 20',
      birthdate: '2010-01-01',
      gender: "Female",
      email: "test3@test.com"
    },
  ];

  const [user, setUser] = React.useState<User>(users[0]);




  const [response, setResponse] = React.useState<ProductApiResponse | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(user)
      setResponse(data);
    }
    fetchProducts();

  }, [user]);

  return (
    <div className="App" style={{height:"100vh", width:"100vw"}}>

      <AppBar position="absolute" >
        <Toolbar
          sx={{
            gap: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Welcome to the Serverless E-Commerce Store!
          </Typography>
          <Select value={user.username} onChange={(e) => setUser(users.find((user) => user.username === e.target.value) as User)}>
            {users.map((user) => <MenuItem value={user.username}>{user.username}</MenuItem>)}
          </Select>
        </Toolbar>
      </AppBar>
      {!response ? <div>


        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>

      </div> : <Stack>

      <div style={{ height: "50px" }}></div>
        <div className="container">
          <div className="row">
            <div className="card">
              <h3>{response.slot1}</h3>
              <ProductCarousel products={response.slot1Products} />
              <Button variant="contained" >
                Buy Now
              </Button>
            </div>
            <div className="card">
              <h3>{response.slot2}</h3>
              <ProductCarousel products={response.slot2Products} />
              <Button variant="contained" >
                Buy Now
              </Button>
            </div>
            <div className="card">
              <h3>{response.slot3}</h3>
              <ProductCarousel products={response.slot3Products} />
              <Button variant="contained">
                Buy Now
              </Button>
            </div>
            <div className="card">
              <h3>{response.slot4}</h3>
              <ProductCarousel products={response.slot4Products} />
              <Button variant="contained">
                Buy Now
              </Button>
            </div>
          </div>
          <div style={{ height: "30px" }}></div>
          <div className="row">
            <div className="card big" >
              <h3>Trending deals!</h3>
              <MultiProductCarousel products={response.featuredProducts} />
            </div>
            <div className="card" >
              <h3>Next Gen Feature!</h3>
              {
                response.nextGenFeature ? <div>
                  <h4>Congratulations! You have been selected to try out our new feature!</h4>
                  <h4>Click the button below to see what it is!</h4>
                  <Button variant="contained" >
                    Try it out!
                  </Button>
                </div> : <div>
                  <h4>Sorry, you have not been selected to try out our new feature.</h4>
                  <h4>Check back later to see if you have been selected!</h4>
                </div>
              }
            </div>
          </div>
        </div>
      </Stack>

      }
    </div>
  );
}

