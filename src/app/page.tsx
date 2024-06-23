'use client'

import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
  VStack,
  Text,
  FileInput,
  useDisclosure,
} from '@yamada-ui/react'
import { Column, PagingTable } from '@yamada-ui/table'
import { DatePicker } from '@yamada-ui/calendar'
import { useMemo } from 'react'
import { faker } from '@faker-js/faker'
import { useForm } from 'react-hook-form'

interface IFormInput {
  productName: string
  warrantyDate: string
  imageUrl: string[]
  note: string
}

export default function Home() {
  const { register } = useForm<IFormInput>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const columns = useMemo<Column<any>[]>(
    () => [
      {
        header: '商品名',
        accessorKey: 'productName',
      },
      {
        header: '保証期限',
        accessorKey: 'date',
      },
      {
        header: '画像URL',
        accessorKey: 'image',
      },
      {
        header: '備考',
        accessorKey: 'note',
      },
    ],
    []
  )

  const data = useMemo<any[]>(() => {
    let resultData: any[] = []

    for (let i = 0; i < 100; i++) {
      resultData.push({
        id: faker.string.uuid(),
        productName: faker.string.uuid(),
        warrantyDate: faker.date.anytime().toUTCString(),
        image: faker.internet.url(),
        note: faker.string.sample(),
      })
    }

    return resultData
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    console.log(register)
  }

  return (
    <Box>
      <Heading as='h1' size='xl'>
        Warranty Management
      </Heading>
      <Box p='md'>
        <Button onClick={onOpen}>新規登録</Button>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlay={false}
        duration={0.4}
        size={{ base: '3xl', md: 'lg' }}
        h='60%'
      >
        <ModalHeader>保証書登録</ModalHeader>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <ModalBody>
            <VStack w='full'>
              <FormControl label='商品名'>
                <Input
                  type='text'
                  placeholder='商品名'
                  size='md'
                  {...register('productName')}
                />
              </FormControl>

              <FormControl label='保証期限'>
                <DatePicker defaultValue={new Date()} />
              </FormControl>

              <FormControl label='画像URL'>
                <FileInput placeholder='multiple' multiple>
                  {(files) => <Text>Selected: {files ? files.length : 0}</Text>}
                </FileInput>
              </FormControl>

              <FormControl label='備考'>
                <Textarea placeholder='備考' size='md' {...register('note')} />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>
              閉じる
            </Button>
            <Button type='submit' colorScheme='primary'>
              登録
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <PagingTable columns={columns} data={data} />
    </Box>
  )
}
