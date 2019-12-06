import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {
  FaGlobe,
  FaSpinner,
  FaCss3,
  FaJsSquare,
  FaRegImage,
} from 'react-icons/fa';
import { MdLocationSearching, MdChevronRight } from 'react-icons/md';
import api from '../../services/api';

import { Container, Form, SubmitButton, List, SubList } from './styles';

export default class Main extends Component {
  state = {
    newCrawler: 'https://elixir-lang.org/',
    loading: false,
    pages: [],
  };

  handleInputChange = e => {
    this.setState({ newCrawler: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { newCrawler } = this.state;

      this.setState({ loading: true });

      const encoded = encodeURIComponent(newCrawler);

      const response = await api.get(`/crawler/${encoded}`);

      this.setState({
        pages: [response.data],
        loading: false,
      });
    } catch (err) {
      toast.error('Network Error');
    }
  };

  render() {
    const { newCrawler, loading, pages } = this.state;

    return (
      <Container>
        <h1>
          <FaGlobe />
          Crawler
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="http://www.website.com"
            value={newCrawler}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <MdLocationSearching color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {pages.map(object =>
            object.map(page => (
              <li key={page.page}>
                <i>
                  <MdChevronRight color="#0277bd" size={14} />
                  <strong>{page.page}</strong>
                </i>

                <SubList>
                  {page.css.map(css => (
                    <li>
                      <FaCss3 color="#0277bd" size={14} />
                      {css}
                    </li>
                  ))}
                </SubList>
                <SubList>
                  {page.js.map(js => (
                    <li>
                      <FaJsSquare color="#ff8f00" size={14} />
                      {js}
                    </li>
                  ))}
                </SubList>
                <SubList>
                  {page.img.map(img => (
                    <li>
                      <FaRegImage color="#ff1a1a" size={14} />
                      {img}
                    </li>
                  ))}
                </SubList>
              </li>
            ))
          )}
        </List>
      </Container>
    );
  }
}
