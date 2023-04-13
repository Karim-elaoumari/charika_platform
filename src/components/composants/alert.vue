<script setup>
import { useAlertStore } from "../../../src/stores/alert"
const alertStore = useAlertStore();
</script>

<template>
     <div :class="['alert', alertStore.getType, alertStore.getVisibility]">
        <slot name="message"></slot>

        <div class="alert-actions" style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
            <div class="slot-link-container " v-html="alertStore.getMessage">
            </div>
            <div>
                <button type="button" class="btn-close" @click="alertStore.removeAlert()" aria-label="Close"></button>
            </div>
            
           
        </div>
    </div>
  </template>
  <style scoped>

.alert {
    position: absolute;
    top: 1%;
    left: 0;
    right: 0;
    z-index: 100;
    margin:  0 1%;
    padding: 0.75rem 1.25rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    animation: fadeIn 0.5s ease;
}
.alert-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.slot-link-container {
    display: flex;
    align-items: center;
    margin-right: 1rem;
}
.alert-success {
    background-color: #28a745;
    border-color: #28a745;
    color: black;
}
.alert-danger {
    background-color: #dc3545;
    border-color: #dc3545;
    color: black;
}
.alert-info {
    background-color: #17a2b8;
    border-color: #17a2b8;
    color: white;
}
.alert-warning {
    background-color: #ffc107;
    border-color: #ffc107;
    color: black;
}
.close {
    padding: 0.75rem 1.25rem;
    margin: -0.75rem -1.25rem -0.75rem auto;
    background-color: transparent;
    border: 0;
}
.close i {
    font-size: 1.5rem;
    color: #fff;
}
.close i:hover {
    color: #000;
    animation: rotate 0.5s linear;
}
.alert.show {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.alert.hide {
    display: none;
}
.alert.fadeOut {
    animation: fadeOut 0.5s ease forwards;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes fadeOut {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-20px);
    }
}
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
/* responsive */
@media screen and (max-width: 768px) {
    .alert {
        margin: 0 5%;
    }
    .alert-actions {
        flex-direction: column;
    }
    .slot-link-container {
        margin-bottom: 1rem;
        margin-right: 0;
        margin-left: 2px;
    }
    .close {
        margin: -0.75rem -1.25rem -0.75rem auto;
    }
}
  </style>
  