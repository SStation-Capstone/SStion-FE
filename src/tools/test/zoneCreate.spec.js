/* eslint-disable no-undef */
import { screen, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { ManageZoneCreate } from '../../pages/station/zone.create';

describe('ManageZoneCreate', () => {
  jest.setTimeout(10000);
  it('renders Create Zone modal', async () => {
    // eslint-disable-next-line react/jsx-filename-extension
    render(<ManageZoneCreate onClose={() => {}} />);
    const createZoneModal = await screen.findByText('Create Zone');
    expect(createZoneModal).toBeVisible();
  });

  it('submits create zone form', async () => {
    const mockCreateMutate = jest.fn();
    jest.mock('@/api/services/stationService', () => ({
      useCreateZone: () => ({ mutateAsync: mockCreateMutate }),
    }));

    render(<ManageZoneCreate onClose={() => {}} />);

    const nameInput = screen.getByLabelText('Name');
    const descriptionInput = screen.getByLabelText('Description');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(nameInput, { target: { value: 'Test Zone' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockCreateMutate).toHaveBeenCalledWith({
      name: 'Test Zone',
      description: 'Test Description',
    });
  });
});
