import Swal from 'sweetalert2';

export default {
  alertDelete(order) {
    const title = order.title || '這筆訂單';
    return Swal.fire({
      title: `確認刪除 ${title} 嗎？`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '是的，刪除！',
      cancelButtonText: '取消'
    })
  }
}