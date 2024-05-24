import React, { useCallback, useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid, Paper } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from '@mui/icons-material/Add';
import useAddItemToGroup from '../hooks/useAddItemToGroup';
import useRemoveItemFromGroup from '../hooks/useRemoveItemFromGroup';
import useFetchGroupItems from '../hooks/useFetchGroupItems';

function Items({ selectedGroupId }) {
  const [ newItemName, setNewItemName ] = useState('');
  const [ newItemPrice, setNewItemPrice ] = useState('');
  const { addItemToGroup } = useAddItemToGroup();
  const { removeItemFromGroup } = useRemoveItemFromGroup();
  const { items, fetchGroupItems } = useFetchGroupItems();

  useEffect(() => {
    if (selectedGroupId) {
      fetchGroupItems(selectedGroupId);
    }
  }, [fetchGroupItems, selectedGroupId]);


  const handleAddItem = useCallback(async () => {
    const result = await addItemToGroup(selectedGroupId, newItemName, newItemPrice);

    if (result) {
      setNewItemName('');
      setNewItemPrice('');
      fetchGroupItems(selectedGroupId); // Refetch members after adding

    }
  }, [selectedGroupId, newItemName, newItemPrice, addItemToGroup, fetchGroupItems]);

  const handleRemoveItem = useCallback(async (itemId) => {
    await removeItemFromGroup(selectedGroupId, itemId);
    fetchGroupItems(selectedGroupId); // Refetch members after adding

  }, [selectedGroupId, removeItemFromGroup, fetchGroupItems]);


  return (
    <Grid item xs={12} md={6} sx={{ height: 'fit' }}>
      <Paper sx={{ p: 2, overflowY: 'auto', height: 'fit' }}>
        <Typography variant="h6" component="div">Items</Typography>
        <List sx={{ overflowY: 'auto', maxHeight: '300px' }}>
          {items.map((item) => (
            <ListItem key={item._id}>
              <ListItemText primary={`${item.name} - $${item.price}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemoveItem(item._id)}>
                  <RemoveCircleIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Box display="flex" alignItems="center" my={2}>
          <TextField
            label="Item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <TextField
            label="Item price"
            type="number"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            sx={{ ml: 2 }}
          />
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            sx={{ ml: 2 }}
          >
            Add Item
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Items;
