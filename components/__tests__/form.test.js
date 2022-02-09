import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from '../Form'

it('renders a form', () => {
    render(<Form />)
    
    const nameLabel = screen.getByTestId('label')
    expect(nameLabel).toBeInTheDocument();
    expect(nameLabel).toHaveTextContent('Enter Player Name:')
})