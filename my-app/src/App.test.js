import { BrowserRouter as Router, Routes, Route, Link,  } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import App from './App';
/*import Detail from './Detail';*/

test('renders main title of the page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Articles/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders total articles', async () => {
  render(<App />)
  const items = await screen.findAllByRole('link');
  expect(items).toHaveLength(4)
})

/*test('renders main title of the page', async() => {
  render(
    <Router>
        <Routes>
          <Route path="/:name" element={<Detail />}  />
        </Routes>
      </Router>
  )
  const items = await screen.findAllByRole('link');
  console.log(items);

  renderWithRouter(<Detail />, {route: '/wiki'})
  const linkElement = await screen.findAllByText("Add");
  console.log(linkElement); 
  expect(linkElement).toBeInTheDocument();
});*/