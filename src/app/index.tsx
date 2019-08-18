import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App as BookApp } from 'app/containers/App';
import { BookForm } from 'app/containers/BookForm';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route exact path="/" component={BookApp} />
    <Route path="/form" component={BookForm} />
    <Route path="/form/:id" component={BookForm} />
  </Switch>
));
