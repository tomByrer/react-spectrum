/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {action} from '@storybook/addon-actions';
import {AlertDialog, Dialog, DialogTrigger} from '@react-spectrum/dialog';
import AlignCenter from '@spectrum-icons/workflow/AlignCenter';
import AlignLeft from '@spectrum-icons/workflow/AlignLeft';
import AlignRight from '@spectrum-icons/workflow/AlignRight';
import Blower from '@spectrum-icons/workflow/Blower';
import Book from '@spectrum-icons/workflow/Book';
import {Content, Header} from '@react-spectrum/view';
import Copy from '@spectrum-icons/workflow/Copy';
import Cut from '@spectrum-icons/workflow/Cut';
import {Divider} from '@react-spectrum/divider';
import {Heading, Keyboard, Text} from '@react-spectrum/typography';
import {Item, Menu, Section} from '../';
import Paste from '@spectrum-icons/workflow/Paste';
import React from 'react';
import {storiesOf} from '@storybook/react';

let iconMap = {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Blower,
  Book,
  Copy,
  Cut,
  Paste
};

let hardModeProgrammatic = [
  {name: 'Section 1', children: [
    {name: 'Copy', icon: 'Copy', shortcut: '⌘C'},
    {name: 'Cut', icon: 'Cut', shortcut: '⌘X'},
    {name: 'Paste', icon: 'Paste', shortcut: '⌘V'}
  ]},
  {name: 'Section 2', children: [
    {name: 'Puppy', icon: 'AlignLeft', shortcut: '⌘P'},
    {name: 'Doggo', icon: 'AlignCenter', shortcut: '⌘D'},
    {name: 'Floof', icon: 'AlignRight', shortcut: '⌘F'},
    {name: 'hasChildren', children: [
      {name: 'Thailand', icon: 'Blower', shortcut: '⌘T'},
      {name: 'Germany', icon: 'Book', shortcut: '⌘G'}
    ]}
  ]}
];

let flatMenu = [
  {name: 'Aardvark'},
  {name: 'Kangaroo'},
  {name: 'Snake'},
  {name: 'Danni'},
  {name: 'Devon'},
  {name: 'Ross'},
  {name: 'Puppy'},
  {name: 'Doggo'},
  {name: 'Floof'}
];

let withSection = [
  {name: 'Animals', children: [
    {name: 'Aardvark'},
    {name: 'Kangaroo'},
    {name: 'Snake'}
  ]},
  {name: 'People', children: [
    {name: 'Danni'},
    {name: 'Devon'},
    {name: 'Ross', children: [
      {name: 'Tests'}
    ]}
  ]}
];

storiesOf('Menu', module)
  .addDecorator(story => (
    <div style={{display: 'flex', background: 'var(--spectrum-global-color-gray-50)', border: '1px solid lightgray', maxHeight: 500}}>
      {story()}
    </div>
  ))
  .add(
    'Default Menu',
    () => (
      <Menu items={flatMenu} itemKey="name" onAction={action('onAction')}>
        {item => <Item>{item.name}</Item>}
      </Menu>
    )
  )
  .add(
    'Menu w/ sections',
    () => (
      <Menu items={withSection} itemKey="name" onAction={action('onAction')}>
        {item => (
          <Section items={item.children} title={item.name}>
            {item => <Item>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'Menu w/ sections and no title',
    () => (
      <Menu items={withSection} itemKey="name" onAction={action('onAction')}>
        {item => (
          <Section items={item.children} aria-label={item.name}>
            {item => <Item>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'Static',
    () => (
      <Menu onAction={action('onAction')}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Menu>
    )
  )
  .add(
    'Static with sections',
    () => (
      <Menu onAction={action('onAction')}>
        <Section title="Section 1">
          <Item>One</Item>
          <Item>Two</Item>
          <Item>Three</Item>
        </Section>
        <Section title="Section 2">
          <Item>One</Item>
          <Item>Two</Item>
          <Item>Three</Item>
        </Section>
      </Menu>
    )
  )
  .add(
    'Static with sections and no title',
    () => (
      <Menu onAction={action('onAction')}>
        <Section aria-label="Section 1">
          <Item>One</Item>
          <Item>Two</Item>
          <Item>Three</Item>
        </Section>
        <Section aria-label="Section 2">
          <Item>One</Item>
          <Item>Two</Item>
          <Item>Three</Item>
        </Section>
      </Menu>
    )
  )
  .add(
    'Static with dialog trigger',
    () => (
      <Menu>
        <Section title="Actions">
          <DialogTrigger isDismissable>
            <Item>Edit...</Item>
            <Dialog>
              <Header>
                <Heading>Edit</Heading>
              </Header>
              <Divider size="M" />
              <Content>
                Testing
              </Content>
            </Dialog>
          </DialogTrigger>
          <DialogTrigger>
            <Item>Delete...</Item>
            <AlertDialog title="Delete" variant="destructive" primaryActionLabel="Delete" cancelLabel="Cancel">
              Are you sure?
            </AlertDialog>
          </DialogTrigger>
        </Section>
      </Menu>
    )
  )
  .add(
    'with single selection',
    () => (
      <Menu selectionMode="single" onSelectionChange={action('onSelectionChange')} items={withSection} itemKey="name">
        {item => (
          <Section items={item.children} title={item.name}>
            {item => <Item childItems={item.children}>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'with default selected menu items',
    () => (
      <Menu selectionMode="single" onSelectionChange={action('onSelectionChange')} items={withSection} itemKey="name" defaultSelectedKeys={['Kangaroo']}>
        {item => (
          <Section items={item.children} title={item.name}>
            {item => <Item childItems={item.children}>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'static with default selected menu items',
    () => (
      <Menu selectionMode="single" onSelectionChange={action('onSelectionChange')} defaultSelectedKeys={['2']}>
        <Section title="Section 1">
          <Item uniqueKey="1">
            One
          </Item>
          <Item uniqueKey="2">
            Two
          </Item>
          <Item uniqueKey="3">
            Three
          </Item>
        </Section>
        <Section title="Section 2">
          <Item uniqueKey="4">
            Four
          </Item>
          <Item uniqueKey="5">
            Five
          </Item>
          <Item uniqueKey="6">
            Six
          </Item>
          <Item uniqueKey="7">
            Seven
          </Item>
        </Section>
      </Menu>
    )
  )
  .add(
    'with selected menu items (controlled)',
    () => (
      <Menu selectionMode="single" onSelectionChange={action('onSelectionChange')} items={withSection} itemKey="name" selectedKeys={['Kangaroo']}>
        {item => (
          <Section items={item.children} title={item.name}>
            {item => <Item childItems={item.children}>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'static with selected menu items (controlled)',
    () => (
      <Menu selectionMode="single" onSelectionChange={action('onSelectionChange')} selectedKeys={['2']}>
        <Section title="Section 1">
          <Item uniqueKey="1">
            One
          </Item>
          <Item uniqueKey="2">
            Two
          </Item>
          <Item uniqueKey="3">
            Three
          </Item>
        </Section>
        <Section title="Section 2">
          <Item uniqueKey="4">
            Four
          </Item>
          <Item uniqueKey="5">
            Five
          </Item>
          <Item uniqueKey="6">
            Six
          </Item>
          <Item uniqueKey="7">
            Seven
          </Item>
        </Section>
      </Menu>
    )
  )
  .add(
    'with disabled menu items',
    () => (
      <Menu items={withSection} itemKey="name" disabledKeys={['Kangaroo', 'Ross']} onAction={action('onAction')}>
        {item => (
          <Section items={item.children} title={item.name}>
            {item => <Item>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'static with disabled menu items',
    () => (
      <Menu disabledKeys={['3', '5']} onAction={action('onAction')}>
        <Section title="Section 1">
          <Item uniqueKey="1">
            One
          </Item>
          <Item uniqueKey="2">
            Two
          </Item>
          <Item uniqueKey="3">
            Three
          </Item>
        </Section>
        <Section title="Section 2">
          <Item uniqueKey="4">
            Four
          </Item>
          <Item uniqueKey="5">
            Five
          </Item>
          <Item uniqueKey="6">
            Six
          </Item>
          <Item uniqueKey="7">
            Seven
          </Item>
        </Section>
      </Menu>
    )
  )
  .add(
    'Multiselect menu',
    () => (
      <Menu items={withSection} itemKey="name" onSelectionChange={action('onSelectionChange')} selectionMode="multiple" defaultSelectedKeys={['Aardvark', 'Snake']} disabledKeys={['Kangaroo', 'Ross']}>
        {item => (
          <Section items={item.children} title={item.name}>
            {item => <Item childItems={item.children}>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'Multiselect menu, static',
    () => (
      <Menu onSelectionChange={action('onSelectionChange')} selectionMode="multiple" defaultSelectedKeys={['2', '5']} disabledKeys={['1', '3']}>
        <Section title="Section 1">
          <Item uniqueKey="1">
            One
          </Item>
          <Item uniqueKey="2">
            Two
          </Item>
          <Item uniqueKey="3">
            Three
          </Item>
        </Section>
        <Section title="Section 2">
          <Item uniqueKey="4">
            Four
          </Item>
          <Item uniqueKey="5">
            Five
          </Item>
          <Item uniqueKey="6">
            Six
          </Item>
        </Section>
      </Menu>
    )
  )
  .add(
    'Menu with autoFocus=true',
    () => (
      <Menu items={withSection} itemKey="name" autoFocus onAction={action('onAction')}>
        {item => (
          <Section items={item.children} title={item.name}>
            {item => <Item>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'Menu with autoFocus="last"',
    () => (
      <Menu items={withSection} itemKey="name" autoFocus="last" onAction={action('onAction')}>
        {item => (
          <Section items={item.children} title={item.name}>
            {item => <Item>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'Menu with keyboard selection wrapping',
    () => (
      <Menu items={withSection} itemKey="name" shouldFocusWrap onAction={action('onAction')}>
        {item => (
          <Section items={item.children} title={item.name}>
            {item => <Item>{item.name}</Item>}
          </Section>
        )}
      </Menu>
    )
  )
  .add(
    'with semantic elements (static)',
    () => (
      <Menu onAction={action('onAction')}>
        <Section title="Section 1">
          <Item textValue="Copy">
            <Copy size="S" />
            <Text>Copy</Text>
            <Keyboard>⌘C</Keyboard>
          </Item>
          <Item textValue="Cut">
            <Cut size="S" />
            <Text>Cut</Text>
            <Keyboard>⌘X</Keyboard>
          </Item>
          <Item textValue="Paste">
            <Paste size="S" />
            <Text>Paste</Text>
            <Keyboard>⌘V</Keyboard>
          </Item>
        </Section>
        <Section title="Section 2">
          <Item textValue="Puppy">
            <AlignLeft size="S" />
            <Text>Puppy</Text>
            <Text slot="description">Puppy description super long as well geez</Text>
            <Keyboard>⌘P</Keyboard>
          </Item>
          <Item textValue="Doggo with really really really long long long text">
            <AlignCenter size="S" />
            <Text>Doggo with really really really long long long text</Text>
            <Text slot="end">Value</Text>
          </Item>
          <Item textValue="Floof">
            <AlignRight size="S" />
            <Text>Floof</Text>
          </Item>
          <Item>
            Basic Item
          </Item>
        </Section>
      </Menu>
    )
  )
  .add(
    'with semantic elements (generative)',
    () => (
      <Menu items={hardModeProgrammatic} itemKey="name" onAction={action('onAction')}>
        {item => (
          <Section items={item.children} title={item.name}>
            {item => customMenuItem(item)}
          </Section>
        )}
      </Menu>
    )
  );
  
let customMenuItem = (item) => {
  let Icon = iconMap[item.icon];
  return (
    <Item childItems={item.children} textValue={item.name}>
      {item.icon && <Icon size="S" />}
      <Text>{item.name}</Text>
      {item.shortcut && <Keyboard>{item.shortcut}</Keyboard>}
    </Item>
  );	
};