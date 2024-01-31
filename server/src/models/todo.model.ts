import { PrismaClient } from '@prisma/client'
import { Task } from '../common/interface'

const prisma = new PrismaClient()

export const todoModel = {
  create: async function (data: Task) {
    try {
      const task = await prisma.tasks.create({
        data: {
          ...data,
          status: 'uncompleted'
        },
      });
      console.log('task', task);
      return {
        status: true,
        message: 'Tạo task thành công',
        data: task,
      };
    } catch (err) {
      let message = (err as Error).message || 'Tạo task thất bại';
      return {
        status: false,
        message: message,
        data: null,
      }
    }
  },
  findAll: async ()=> {
    try {
      let data = await prisma.tasks.findMany();
      return {
        status: true,
        data,
        message: 'Tìm thành công'
      };
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Tìm thất bại'
      }
    }
  },
  findById: async (id: number) => {
    try {
      let data = await prisma.tasks.findUnique({
        where: {
          id,
        },
      })
      return {
        status: true,
        data,
        message: 'Tìm thành công',
      }
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Tìm thất bại',
      }
    }
  },
  edit: async (id: number, task: Task) => {
    try {
      let data = await prisma.tasks.update({
        where: {
          id,
        },
        data: {
          ...task,
        },
      })
      return {
        status: true,
        data,
        message: 'Sửa thành công',
      }
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Sửa thất bại',
      }
    }
  },
  delete: async (id: number) => {
    try {
      let data = await prisma.tasks.delete({
        where: {
          id,
        },
      })
      return {
        status: true,
        data,
        message: 'Xóa thành công',
      }
    } catch (err) {
      console.log('err', err);
      return {
        status: false,
        data: null,
        message: 'Xóa thất bại',
      }
    }
  }
}
