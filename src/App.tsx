import React, { ComponentElement } from 'react';
import './App.css';
import Loader from './components/Loader/Loader';
import { Routes, Route } from "react-router-dom";
const MovieDetails: any = React.lazy(() => import('./components/MovieDetails/MovieDetails'));
const MoviesList: any = React.lazy(() => import('./components/MoviesList/MoviesList'));

function App() {

  type routeProps = {
    path: string;
    component:  ComponentElement<any, any>;
    children?: routeProps[];
  };

  const routes: routeProps[] = [
    {
      path: '/',
      component: <MoviesList/>,
    },
    {
      path: 'movies',
      component: <MoviesList/>,
    },
    {
      path: 'movies/:id',
      component: <MovieDetails/>,      
    }
  ];


  
  return (
    <>
        <div className="App">

          <React.Suspense fallback={<Loader />}>
            <Routes>

                { 
                  routes.map((route: routeProps) => (
                    <Route key={route.path} path={route.path} element={route.component}>
                      {
                        route.children?.map((childRoute: routeProps) => (
                          <Route key={childRoute.path} path={childRoute.path} element={childRoute.component} />
                        ))
                      }
                    </Route>
                  ))
                }
            
            </Routes>
          </React.Suspense>

        </div>
    </>
    
  );
}

export default App;
