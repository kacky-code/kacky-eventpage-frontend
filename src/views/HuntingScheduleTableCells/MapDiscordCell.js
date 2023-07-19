/* eslint-disable react/prop-types */
import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';

import { Switch, useToast } from '@chakra-ui/react';

import { useMutation } from '@tanstack/react-query';

import AuthContext from '../../context/AuthContext';
import { postSpreadsheetData } from '../../api/api';

const MapDiscordCell = memo(({ discordPing, eventtype, rowIndex, table, mapId }) => {
  const { authentication } = useContext(AuthContext);

  const toast = useToast();

  let alarmState = discordPing;
  const mutation = useMutation(data => postSpreadsheetData(data, eventtype), {
    onSuccess: () => {
      table.options.meta.updateData(rowIndex, 'discordPing', alarmState);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  // Cork doesnt want the actual value xdd
  // eslint-disable-next-line no-unused-vars
  function onSubmit() {
    alarmState = !alarmState;
    mutation.mutate({
      mapid: mapId,
      alarm: alarmState,
      token: authentication.token,
    });
  }

  return (
    <Switch
      isDisabled={!authentication.isLoggedIn}
      // isDisabled="true"
      onChange={e => onSubmit(e.target.value)}
      defaultChecked={alarmState}
    />
  );
});

MapDiscordCell.propTypes = {
  discordPing: PropTypes.bool,
  eventtype: PropTypes.string.isRequired,
};

MapDiscordCell.defaultProps = {
  discordPing: false,
};

export default MapDiscordCell;
