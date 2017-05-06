import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popup, Dropdown, Input, Form, Icon, Table, Label, Grid } from 'semantic-ui-react';

const Transfer = ({
  searchBookValue,
  searchRegionValue,
  searchResult,
  requestCount,
  displayRegion,
  waitResponse,
  toRespond,
  transferSearchOnChange,
  transferRegionOnChange,
  transferCountOnChange,
  searchBook,
  sendRequest,
  removeRequest,
  sendResponse,
  searchInventory
 }) => {
  return (
    <Grid columns='equal'>
      <Grid.Row>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column>
          <Form
            onSubmit={
              e => {
                e.preventDefault();
                searchBook({ book: searchBookValue, region: searchRegionValue });
              }
            }
          >
            <Label as='a' color='red' size='big' ribbon>Search</Label>
            <Form.Field inline>
              <label htmlFor='searchBook'>Book</label>
              <Input
                name='searchBook'
                value={searchBookValue}
                icon={<Icon name='search' inverted circular link />}
                placeholder='Search...'
                onChange={transferSearchOnChange}
              />
              <Button icon='cancel' value='' circular onClick={transferSearchOnChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor='searchBookstoreRegion'>Region</label>
              <Dropdown
                name='searchBookstoreRegion'
                placeholder='Select Region'
                search
                selection
                scrolling
                options={displayRegion}
                onChange={transferRegionOnChange}
              />
            </Form.Field>
            <Button
              onClick={
                e => {
                  e.preventDefault();
                  searchBook({ book: searchBookValue, region: searchRegionValue });
                }
              }
            >Search</Button>
          </Form>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={12}>
          <Table color='red' celled selectable padded>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Region</Table.HeaderCell>
                <Table.HeaderCell>Count</Table.HeaderCell>
                <Table.HeaderCell>
                  <Input
                    name='requestCount'
                    type='number'
                    min='1'
                    onChange={transferCountOnChange}
                  />Request
                  </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {searchResult.map((result) => <Table.Row key={result.id} textAlign='center'>
                <Table.Cell collapsing>{result.Name}</Table.Cell>
                <Table.Cell collapsing>{result.Phone}</Table.Cell>
                <Table.Cell collapsing>{result.Region}</Table.Cell>
                <Table.Cell collapsing>{result.Count}</Table.Cell>
                <Table.Cell collapsing>
                  <Button
                    positive
                    content='Request'
                    onClick={e => {
                      e.preventDefault();
                      sendRequest(result, requestCount);
                    }}
                  />
                </Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={7}>
          <Label as='a' color='orange' size='big' ribbon>Wait Response</Label>
          <Table color='orange' celled selectable compact padded>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>To</Table.HeaderCell>
                <Table.HeaderCell>Book</Table.HeaderCell>
                <Table.HeaderCell>Count</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {waitResponse.map((req) =>
                <Table.Row
                  key={req.id}
                  textAlign='center'
                  positive={!!req.Accept}
                  negative={!req.Accept}
                >
                  <Popup
                    trigger={<Table.Cell collapsing>{req.Res}</Table.Cell>}
                    header={`Bookstore Phone: ${req.ResPhone}`}
                    inverted
                  />
                  <Table.Cell collapsing>
                    {req.Name}
                    <Icon
                      name='search'
                      inverted
                      circular
                      link
                      onClick={e => {
                        e.preventDefault();
                        searchInventory(req.ISBN);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell collapsing>{req.Count}</Table.Cell>
                  <Table.Cell collapsing>
                    {req.Accept ? 'Waiting Transfer' : 'Waiting Response'}
                  </Table.Cell>
                  <Table.Cell collapsing>
                    <Button
                      positive={!!req.Accept}
                      content={req.Accept ? 'Receive?' : 'Cancel'}
                      onClick={e => {
                        e.preventDefault();
                        removeRequest(req);
                      }}
                    />
                  </Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={7}>
          <Label as='a' color='green' size='big' ribbon>To Respond</Label>
          <Table color='green' celled selectable compact padded>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>From</Table.HeaderCell>
                <Table.HeaderCell>Book</Table.HeaderCell>
                <Table.HeaderCell>Count</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {toRespond.map((res) =>
                <Table.Row
                  key={res.id}
                  textAlign='center'
                  positive={!!res.Accept}
                  negative={!res.Accept}
                >
                  <Popup
                    trigger={<Table.Cell collapsing>{res.Req}</Table.Cell>}
                    header={`Bookstore Phone: ${res.ReqPhone}`}
                    inverted
                  />
                  <Table.Cell collapsing>
                    {res.Name}
                    <Icon
                      name='search'
                      inverted
                      circular
                      link
                      onClick={e => {
                        e.preventDefault();
                        searchInventory(res.ISBN);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell collapsing>{res.Count}</Table.Cell>
                  <Table.Cell collapsing>
                    {res.Accept ? 'Transferring' : 'Respond?'}
                  </Table.Cell>
                  <Table.Cell collapsing>
                    {!res.Accept &&
                      <Button.Group>
                        <Button
                          positive
                          content='Ok'
                          onClick={(e) => {
                            e.preventDefault();
                            sendResponse(res);
                          }}
                        />
                        <Button.Or />
                        <Button
                          content='No'
                          onClick={e => {
                            e.preventDefault();
                            removeRequest(res);
                          }}
                        />
                      </Button.Group>}
                  </Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      </Grid.Row>
    </Grid >
  );
};

Transfer.propTypes = {
  searchBookValue: PropTypes.string.isRequired,
  searchRegionValue: PropTypes.number.isRequired,
  searchResult: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  requestCount: PropTypes.number.isRequired,
  displayRegion: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  waitResponse: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  toRespond: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  transferSearchOnChange: PropTypes.func.isRequired,
  transferRegionOnChange: PropTypes.func.isRequired,
  transferCountOnChange: PropTypes.func.isRequired,
  searchBook: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
  removeRequest: PropTypes.func.isRequired,
  sendResponse: PropTypes.func.isRequired,
  searchInventory: PropTypes.func.isRequired,
};

export default Transfer;
