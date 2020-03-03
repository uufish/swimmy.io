import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const ListPrivacy: FunctionComponent = () => {
  return (
    <List disablePadding>
      <Link to={'/'}>
        <ListItem button>
          <ListItemText primary={'ホーム'} />
        </ListItem>
      </Link>
      <Divider />
      <Link to={'/threads'}>
        <ListItem button>
          <ListItemText primary={'スレッド'} />
        </ListItem>
      </Link>
      <Divider />
      <Link to={'/images'}>
        <ListItem button>
          <ListItemText primary={'フォト'} />
        </ListItem>
      </Link>
      <Divider />
      <Link to={'/search'}>
        <ListItem button>
          <ListItemText primary={'探す'} />
        </ListItem>
      </Link>
      <Divider />
      <Link to={'/others'}>
        <ListItem button>
          <ListItemText primary={'その他'} />
        </ListItem>
      </Link>
      <Divider />
    </List>
  )
}

export default ListPrivacy
