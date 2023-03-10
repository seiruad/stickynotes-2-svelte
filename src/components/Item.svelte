<script lang="ts">
    import { fade } from 'svelte/transition';

    export let isCurrent : Boolean;
    export let isOver : Boolean;
    export let color : String;
    

</script>

<div class="item"
    in:fade={{duration: 500, delay: 300}}
    class:current={isCurrent}
    class:over={isOver}
    class:red={color === 'redv1'}
    class:green={color === 'greenv1'}
    class:default={color === 'defaultv1'}
    class:premium={color === 'premium'}
    class:yellow={color === 'yellow'}
    class:blue={color === 'blue'}
    class:pink={color === 'pink'}
    class:orange={color === 'orange'}><slot></slot></div>


<style>
    .item {
        width: 100%;
        min-height: 80px;
        padding: 12px 12px;
        border-radius: 0 6px 0 6px;
        border-width: 6px 0 0 0;
        border-style: solid;
        border-color: rgba(103, 80, 164, .08);

        margin-bottom: 1rem;
        background: rgba(103, 80, 164, .05);
        /* background: #7D5260; */
        /* background: #FFFBFE; */
        color: #1C1B1F;
        /* color: #FFFFFF; */
        font-size: 1rem;
        text-align: left;
        width: 100%;
        height: auto;
        cursor: pointer;



        /* box-shadow: 1px 2px 4px rgba(0,0,0,.25); */
        position: relative;
    }

    .item::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        border-style: solid;
        border-width: .5rem;
        border-color:   rgba(103, 80, 164, .08) #FFFBFE #FFFBFE rgba(103, 80, 164, .08);
        /* border-color: rgba(103, 80, 164, .08) #E7E0EC #E7E0EC rgba(103, 80, 164, .08); */
        transition: all .3s;
        transition-delay: 0;
    }

    
    .item.over {
        background: rgba(103, 80, 164, .08);
        /* box-shadow: 1px 2px 8px rgba(0,0,0,.25); */
    }
    .item.current {
        background: rgba(103, 80, 164, .11);
    }


    /* Colors */
    .item.red {
        border-color: #FF6347;
    }
    .item.premium {
        border-color: #BA55D3;
    }
    .item.green {
        border-color: #9ACD32;
    }
    .item.yellow {
        border-color: #FFD700;
    }
    .item.blue {
        border-color: #87CEEB;
    }
    .item.orange {
        border-color: #FFA500;
    }
    .item.pink {
        border-color: #FFB6C1;
    }

</style>
   
   