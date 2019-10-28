import { Drawer, List, ListItem, ListItemText, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { firestore } from 'firebase/app'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { collectionData } from 'rxfire/firestore'
import { POSTS_AS_THREAD } from '../../firestore/constants/collection'
import { DESC } from '../../firestore/constants/order'
import { Post } from '../../firestore/types/post'
import ListItemThread from './ListItemThread'

type Props = { threadId: string }

const DrawerThread: FunctionComponent<Props> = ({ threadId }) => {
  const [posts, setPosts] = useState<Post[]>([])

  const [limit, setLimit] = useState(24)

  const [loading, setLoading] = useState(true)

  const [loadingMore, setLoadingMore] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    const subscription = collectionData<Post>(
      firestore()
        .collection(POSTS_AS_THREAD)
        .limit(limit)
        .orderBy('updatedAt', DESC)
    ).subscribe(_posts => {
      setPosts(_posts)
      setLoading(false)
      setLoadingMore(false)
    })
    return () => subscription.unsubscribe()
  }, [limit])

  const onMore = useCallback(() => {
    if (loadingMore) return
    setLoadingMore(true)
    setLimit(limit + 24)
  }, [limit, loadingMore])

  return (
    <div>
      <Drawer
        open={true}
        classes={{ paper: classes.drawerPaper }}
        variant={'persistent'}
      >
        <List>
          {loading && (
            <ListItem button divider>
              <ListItemText primary={'読み込み中...'} />
            </ListItem>
          )}
          {posts.map(post => (
            <ListItemThread
              key={post.id}
              post={post}
              selected={threadId === post.id}
            />
          ))}
          {!loading && limit < 24 * 7 && (
            <ListItem button>
              <ListItemText onClick={onMore} primary={'さらに読み込む'} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  )
}

const useStyles = makeStyles<Theme>(({ shadows, breakpoints, spacing }) => {
  return {
    drawerPaper: {
      position: 'fixed',
      height: '100%',
      width: spacing(50),
      zIndex: 1300 - 1,
      boxShadow: shadows[1],
      [breakpoints.up('lg')]: { width: spacing(70) }
    }
  }
})

export default DrawerThread