import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import HeaderForm from './HeaderForm';

describe('HeaderForm', () => {
  beforeEach(() => {

    render(
      <HeaderForm/>
    );
  });

  it("Navigation bar is rendered correctly", () => {
    expect(screen.getByText("Hello I am a header")).toBeInTheDocument();
  });
});