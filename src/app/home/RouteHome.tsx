import { CircularProgress, Divider, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CardPost from 'app/home/components/CardPost'
import Header from 'app/shared/components/AppBarDefault'
import ButtonMore from 'app/shared/components/ButtonMore'
import FragmentHead from 'app/shared/components/FragmentHead'
import SectionTitle from 'app/shared/components/SectionTitle'
import TextFieldPost from 'app/shared/components/TextFieldPost'
import { POSTS_AS_ANONYM } from 'app/shared/constants/collection'
import { DESC } from 'app/shared/constants/order'
import { Post } from 'app/shared/firestore/types/post'
import { useCollectionState } from 'app/shared/hooks/useCollectionState'
import { px } from 'app/shared/styles/px'
import { firestore } from 'firebase/app'
import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { RouteComponentProps } from 'react-router'
import { collectionData } from 'rxfire/firestore'

type Props = RouteComponentProps

const RouteHome: FunctionComponent<Props> = ({ location }) => {
  const key = location.pathname

  const [__posts, __limit, setState] = useCollectionState<Post>(key)

  const [posts, setPosts] = useState(__posts)

  const [limit, setLimit] = useState(__limit)

  const [loading, setLoading] = useState(__posts.length === 0)

  const [loadingMore, setLoadingMore] = useState(false)

  const classes = useStyles({})

  useEffect(() => {
    const subscription = collectionData<Post>(
      firestore()
        .collection(POSTS_AS_ANONYM)
        .limit(limit)
        .orderBy('createdAt', DESC)
    ).subscribe(_posts => {
      setPosts(_posts)
      setLoading(false)
      setLoadingMore(false)
    })
    return () => subscription.unsubscribe()
  }, [limit])

  useEffect(() => {
    return () => setState(posts, limit)
  }, [limit, posts, setState])

  const onLoadMore = useCallback(() => {
    if (loadingMore) return
    setLoadingMore(true)
    setLimit(_limit => _limit + 16)
  }, [loadingMore])

  return (
    <Fragment>
      <FragmentHead />
      <Header />
      <main className={classes.root}>
        <SectionTitle
          title={'スイミーにようこそ'}
          description={`スイミーは完全な匿名の電子掲示板です。
          ログインすることでSNSのような機能が使えたりもします。`}
        />
        <TextFieldPost />
        {loading && <CircularProgress className={classes.progress} />}
        {!loading && (
          <section className={classes.section}>
            <ul className={classes.posts}>
              {posts.map((post, index) => (
                <li key={post.id}>
                  <CardPost post={post} />
                  <Divider />
                </li>
              ))}
            </ul>
            {limit < 400 && (
              <ButtonMore onClick={onLoadMore} inProgress={loadingMore} />
            )}
          </section>
        )}
      </main>
    </Fragment>
  )
}

const useStyles = makeStyles<Theme>(({ spacing }) => {
  return {
    posts: { display: 'grid', margin: 0, paddingLeft: 0 },
    progress: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: spacing(10)
    },
    root: { display: 'grid' },
    section: { display: 'grid', gridRowGap: px(spacing(2)) }
  }
})

export default RouteHome
