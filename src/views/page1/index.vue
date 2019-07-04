<template>
    <div class="page1">
        <!-- <head-search></head-search>
     
        <!-- <ColumnPlus></ColumnPlus> -->

        <Tabel :data="data" :columns="columns2"></Tabel>
    </div>
</template>

<script>
import HeadSearch from './components/HeadSearch';
import Tabel from './components/Table';
import ColumnPlus from './components/ColumnPlus';
export default {
    name: 'Page1',
    data() {
        return {
            columns2: [
                {
                    label: 'City',
                    prop: 'city',
                    width: 100
                },
                {
                    label: 'Address',
                    kpropey: 'address',
                    width: 200
                },
                {
                    label: 'Postcode',
                    prop: 'zip',
                    width: 100
                },
                {
                    label: 'Action',
                    prop: 'action',
                    fixed: 'right',
                    width: 120,
                    render: (h, params) => {
                        return [
                            h('div', [
                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on:{
                                            click(){
                                                console.log(params);
                                            }
                                        }
                                    },
                                    'View'
                                ),
                                h(
                                    'el-button',
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        }
                                    },
                                    'Edit'
                                )
                            ])
                        ];
                    }
                }
            ],
            data: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    province: 'America',
                    city: 'New York',
                    zip: 100000
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'Washington, D.C. No. 1 Lake Park',
                    province: 'America',
                    city: 'Washington, D.C.',
                    zip: 100000
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    province: 'Australian',
                    city: 'Sydney',
                    zip: 100000
                }
            ]
        };
    },
    components: {
        HeadSearch,
        Tabel,
        ColumnPlus
    },
    created() {}
};
</script>

<style></style>
