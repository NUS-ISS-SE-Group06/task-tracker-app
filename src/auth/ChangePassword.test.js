import { render, screen } from '@testing-library/react';
import React from 'react';
import ChangePassword from "./ChangePassword";
test('Change Password Test', () => {
    render(<ChangePassword/>);
    const linkElement = screen.getByText(/Change Password/i);
    expect(linkElement).toBeInTheDocument();
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    const passwordInput = screen.getByLabelText(/Current Password:/i);
    expect(passwordInput).toBeInTheDocument();
    const passwordInput2 = screen.getByLabelText(/New Password:/i);
    expect(passwordInput2).toBeInTheDocument();
    const passwordInput3 = screen.getByLabelText(/Re-enter Password:/i);
    expect(passwordInput3).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Submit/i });
    expect(button).toBeInTheDocument();
});