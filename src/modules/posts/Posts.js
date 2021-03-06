/** @flow */
/**
 * Fetch the posts from the server in the componentDidMount. Show the list of posts
 * and make it able to be click and see the post in details.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingScreen from '../../components/LoadingScreen';

import { getFetchAllPosts, selectPost } from './actions';
import type { Post } from '../../types/Data';

type Props = {
  posts: Array<Post>;
  getFetchAllPosts: () => Promise<void>;
  selectPost: (id: string) => string;
}

type State = {
  loading: boolean;
}

@connect(
  state => ({
    posts: state.posts.posts,
  }),
  { getFetchAllPosts, selectPost }
)
class Posts extends Component<void, Props, State> {
  state = { loading: false }

  componentDidMount() {
    (async () => {
      if (this.props.posts.length < 1) {
        await this.props.getFetchAllPosts();
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    })();
  }

  _goToHome = (): void => browserHistory.push('/');

  _onClick = (id: string): void => {
    this.props.selectPost(id);
    browserHistory.push(`/posts/${id}`);
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    } else if (!this.props.posts) {
      return (
        <h1>No post yet</h1>
      );
    }
    return (
      <div>
        {this.props.posts.map((post: Post, i: number) => (
          <li className="card-list" key={i}>
            <Card>
              <h1>{post.title}</h1>
              <div className="card-text">
                <p>{post.text}</p>
              </div>
              <div>
                <Button onClick={() => this._onClick(post._id)}>
                  See post
                </Button>
              </div>
            </Card>
            <br />
          </li>
        ))}
        <Button onClick={this._goToHome}>Go Home</Button>
      </div>
    );
  }
}

export default Posts;
