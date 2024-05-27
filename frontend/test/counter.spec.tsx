import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import App from '../src/App';

describe("'App'", () => {
  it('Renders correctly and buttons works', async () => {
    fetchMock.get('http://localhost:5173/api/counter', { id: 1, count: 0 });
    fetchMock.get('http://localhost:5173/api/counter/1/increase', {
      id: 1,
      count: 1,
    });
    fetchMock.get('http://localhost:5173/api/counter/1/decrease', {
      id: 1,
      count: -1,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('count is 0')).toBeInTheDocument();
    });

    await act(() => {
      fireEvent.click(screen.getByText('Increase'));
    });

    await waitFor(() => {
      expect(screen.getByText('count is 1')).toBeInTheDocument();
    });

    await act(() => {
      fireEvent.click(screen.getByText('Decrease'));
    });

    await waitFor(() => {
      expect(screen.getByText('count is -1')).toBeInTheDocument();
    });
  });
});
